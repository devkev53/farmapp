from django.shortcuts import render
import string
from plantations.models import Plantation
from django.utils.crypto import get_random_string
import random

# Create your views here.


def create_plantation_random(cantidad):
    for x in range(cantidad):
        name = 'plant_{}'.format(get_random_string(5, string.ascii_letters))
        description = 'Created a random plantation'
        duration = random.randint(50, 250)
        Plantation.objects.create(name=name, description=description, duration=duration)
    return '{} Plantation created successfull'.format(x)
