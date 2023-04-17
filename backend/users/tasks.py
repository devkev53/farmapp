from celery import shared_task
from users.models import User

@shared_task
def delete_last_user():
    last_user = User.objects.order_by('-date_joined').last()
    if last_user.username != 'admin' or last_user.username != 'test':
        last_user.delete()
    else:
        print(
            'El usuario con username {} no se puede eliminnar'.format(
            last_user.username
            )
        )
