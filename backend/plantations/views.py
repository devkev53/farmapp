import string
from django.http import Http404, HttpResponse
from django.shortcuts import render
from plantations.models import Plantation, Irrigation, State_Ground, State_Irrigation
from django.utils.crypto import get_random_string
from django.template.loader import render_to_string
from django.views.generic import View

from weasyprint import HTML
from weasyprint.text.fonts import FontConfiguration

import random

# Create your views here.


def create_plantation_random(cantidad):
    for x in range(cantidad):
        name = 'plant_{}'.format(get_random_string(5, string.ascii_letters))
        description = 'Created a random plantation'
        duration = random.randint(50, 250)
        Plantation.objects.create(name=name, description=description, duration=duration)
    return '{} Plantation created successfull'.format(x)


def delete_all_plantations():
    plantations = Plantation.objects.all()
    for plantation in plantations:
        plantation.delete()
    return '{} Plantation deleterd successfull'.format()
