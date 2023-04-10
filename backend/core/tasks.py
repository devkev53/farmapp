from celery import Celery, shared_task
from django.core.mail import send_mail
from users.models import User
from django.conf.global_settings import EMAIL_HOST_USER

def send_emails_users():
    asunto = 'Mensaje de Prueba'
    mensaje = 'Bienvenido, esto es un mensaje de prueba de CELERY, REDIS Y DJANGO'
    users = User.objects.filter(username='admin').first()
    print(users.email)
    send_mail(asunto, mensaje, EMAIL_HOST_USER, [users.email], fail_silently=False,)
    # for user in users: