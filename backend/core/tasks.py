from celery import shared_task
from users.models import User
from backend.settings.local import EMAIL_HOST_USER
from django.core.mail import send_mail


@shared_task(bind=True)
def say_hello(self):
    print('Hello')
    for i in range(10):
        print(i)
    return "Done"


@shared_task(bind=True)
def send_email_func(self):
    users = User.objects.all()
    for user in users:
        mail_subject = "Hi! Celery Testing"
        message = 'This is a test mail from app django using celery'
        to_email = user.email
        if user.username == 'admin':
            send_mail (
                subject=mail_subject,
                message=message,
                from_email=EMAIL_HOST_USER,
                recipient_list=[to_email],
                fail_silently=True
            )
            print("Email send to user: {}".format(user.username))
        else:
            print("This user: {} no exist in de app!".format(user.username))

    return "Done"

@shared_task(bind=True)
def delete_last_user(self):
    username = ''
    user = User.objects.last()
    if user.username != 'admin' or user.username != 'test' or user.username != 'prueba':
        username = user.username
        user.delete()
        print('User with username: {} has be delete successfull..!'.format(username))
    return "Done"
    
@shared_task(bind=True)
def print_message(self):
    num = Plantation.objects.count()
    print(num)
    return "Done"
