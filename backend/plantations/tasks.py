from celery import shared_task
from plantations.models import Plantation


@shared_task()
def delete_last_plantation(self):
    name = ''
    plantation = Plantation.objects.last()
    name = plantation.name
    plantation.delete()
    print ('Plantation with name: {} has be deleted successfull..!'.format(name))
    return "Done"
