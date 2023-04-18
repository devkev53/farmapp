from users.models import User

def my_scheduled_job():
  pass

def delete_last_user():
  last_user = User.objects.order_by('-date_joined').last()
  if last_user.username != 'admin' or last_user.username != 'test' or last_user.username != 'prueba':
    last_user.delet()
    print('The last user has be deleted successfull')
  else:
    print('The user whit username {} cannot be deleted'.format(last_user.username))
