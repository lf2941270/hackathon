FROM node:4-wheezy
RUN groupadd user && useradd --create-home --home-dir /home/user -g user user
#RUN apt-get update && apt-get i
ENV HACKATHON_SOURCE /usr/src/hackathon
WORKDIR $HACKATHON_SOURCE
#RUN buildDeps=' \
#		gcc \
#		make \
#		python \
#		unzip \
#	'
#RUN apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN npm install -g gulp-cli
COPY ./package.json  ${HACKATHON_SOURCE}/
RUN npm install
WORKDIR $HACKATHON_SOURCE
COPY . ${HACKATHON_SOURCE}/
RUN gulp
RUN npm cache clean
RUN rm -rf /tmp/npm*
EXPOSE 2368
CMD ["node", "index"]