import string
from django.http import Http404, HttpResponse
from django.shortcuts import render
from plantations.models import Plantation
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

def plantation_pdf(request, pk):
    print(pk)
    try:
        plantation = Plantation.objects.get(id=pk)
        context = {
            "plantation": plantation
        }
        html = render_to_string("plantations/plantation_info-pdf.html", context)

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = "inline; report.pdf"

        font_config = FontConfiguration()
        HTML(string=html).write_pdf(response, font_config=font_config)

        return response
    
    except Plantation.DoesNotExist:
        raise Http404("Plantation does no exist") 
    