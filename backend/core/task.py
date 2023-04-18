from celery import shared_task


@shared_task(bind=True)
def say_hello(self):
    print('Hello')
    for i in range(10):
        print(i)
    return "Done"