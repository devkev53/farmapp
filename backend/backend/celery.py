from __future__ import absolute_import, unicode_literals
import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')

app = Celery('backend')

app.config_from_object(settings, namespace='CELERY')

# # Celery Beat Settings // si llamo la tarea en el views tengo que desactivvar esta opcion
# app.conf.beat_schedule = {
    
# }

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')