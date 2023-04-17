import os
from celery import Celery

# from celery.schedules import crontab
# from core.tasks import auto_delete_users


# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')

app = Celery('backend')


# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')



# Load task modules from all registered Django apps.
app.autodiscover_tasks()




@app.task
def say_hello():
    print('hello')

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')


@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(10, delete_last_user.s())