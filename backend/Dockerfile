FROM python

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/backend/

EXPOSE 8000

COPY ./entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh" ]