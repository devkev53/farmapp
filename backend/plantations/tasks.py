from celery import shared_task
from backend.celery import app as celery_app
from plantations.models import Plantation

@shared_task(bind=True)
def print_message(self):
    num = Plantation.objects.count()
    
    print(num)
    return num
