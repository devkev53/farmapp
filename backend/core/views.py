from django.shortcuts import render
from django.http import HttpResponse
import string
from django.utils.crypto import get_random_string
from .tasks import say_hello, send_email_func

from core.models import User
from plantations.models import Plantation

from django.template.loader import render_to_string

from weasyprint import HTML
from weasyprint.text.fonts import FontConfiguration

from django.conf import settings
import os


# Create your views here.

def create_user_random(cantidad):
    for x in range(cantidad):
        username = 'usuario_{}'.format(get_random_string(5, string.ascii_letters))
        email = '{}@miumg.com'.format(username)
        password = 'abc123/-'
        User.objects.create_user(
            username=username, email=email, password=password
            )
    return '{} Usuarios creados exitosamente..!'.format(cantidad)


def test(request):
    say_hello()
    return HttpResponse('Done Test')

def send_mail_to_all(request):
    send_email_func()
    return HttpResponse('Sending emails')


def report_all_pdf(request):

    plantations = Plantation.objects.filter(is_active=True).all()
    context = {
        "plantations": plantations
    }
    html = render_to_string("core/report-pdf.html", context)
    # css_url = 'static/core/bootstrap/css/bootstrap.min.css'

    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = "inline; report.pdf"

    font_config = FontConfiguration()
    HTML(string=html).write_pdf(response, font_config=font_config)

    return response