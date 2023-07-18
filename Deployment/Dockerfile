FROM python:3.8-slim-buster

ARG AWS_REGION
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY

WORKDIR /root

COPY . .

RUN pip3 install -r requirements.txt

RUN mkdir .aws

RUN printf "[default]\nregion = ${AWS_REGION}\noutput = json\n" > .aws/config
RUN printf "[default]\naws_access_key_id = ${AWS_ACCESS_KEY}\naws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}\n" > .aws/credentials

EXPOSE 5000

CMD ["python3", "__init__.py"]