from __future__ import absolute_import, unicode_literals
import os

from celery import Celery
from django.conf import settings
from celery.schedules import crontab

# from plantations.tasks import delete_last_plantation

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')

app = Celery('backend')
app.conf.enable_utc = False

app.conf.update(timezone = 'America/Guatemala')

app.config_from_object(settings, namespace='CELERY')

# # Celery Beat Settings // si llamo la tarea en el views tengo que desactivvar esta opcion
# app.conf.beat_schedule = {
#  'send-mail-every-day-at-8': {
#     'task': 'core.tasks.send_email_func',
#     'schedule': crontab(hour=22, minute=47),
#     # 'args': (),
#  },
#  'delete_last_user': {
#     'task': 'core.tasks.delete_last_user',
#     'schedule': crontab(hour=23, minute=22),
#     # 'args': (),
#  },

# }

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Call delete plantation every 30 seconds
    sender.add_periodic_task(30.0, delete_last_plantation, name='delete plantation')
    

# app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

@app.task(bind=True)
def say_this_is_a_shit(self):
    print("This is a shit.....!")
    return "Done"