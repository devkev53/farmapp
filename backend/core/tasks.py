from celery import shared_task
from django.core.mail import send_mail
from users.models import User
from django.conf.global_settings import EMAIL_HOST_USER
from datetime import datetime
import pytz

# @shared_task
# def send_emails_users():
#     asunto = 'Mensaje de Prueba'
#     mensaje = 'Bienvenido, esto es un mensaje de prueba de CELERY, REDIS Y DJANGO'
#     users = User.objects.all()
#     # print(users.email)
#     for user in users:
#         send_mail(asunto, mensaje, EMAIL_HOST_USER, [user.email], fail_silently=False,)
#     # for user in users:
#     return '{} se envio correo correctamente'.format(user)

@shared_task
def auto_delete_users():
    users = User.objects.all()
    current_dateTime = datetime.now()
    initial_time = "2023-04-11 03:05:50 PM"
    print(current_dateTime)
    formatting = "%Y-%m-%d %I:%M:%S %p"
    initial_time_date = datetime.strptime(initial_time, formatting)
    print("-----*-*-*-*-*-*--------")
    print(initial_time_date)
    print("*-*-*-*-*-*-*-*-*-*-*-* EN ESPERA *-*-*-*-*-*-*-*-*-*-*-*")

    while(initial_time_date < current_dateTime):
        print("*-*-*-*-*-*-*-*-*-*-*-* INICIA LA MATANSA *-*-*-*-*-*-*-*-*-*-*-*")
        for user in users:
            if user.username != 'admin' or user.username != 'test' or user.username != 'prueba':
                username = user.username
                User.objects.filter(id=user.id).delete()
                return '{} has deleted'.format(username)
    # if (initial_time_date > current_dateTime) :
    #     print("-*-*-*-*-*-*-*-*- Aun no es hora -*-*-*-*-*-*-*-*-")
    # else :
    #     print("--------------- El conteo Inicia....! ---------------")
