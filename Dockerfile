FROM jenkins/jenkins:lts

USER root

# ติดตั้ง Docker
RUN apt-get update && \
    apt-get install -y docker.io curl gnupg

# ติดตั้ง Node.js (เช่น v18)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# ให้ user jenkins ใช้ docker ได้
RUN usermod -aG docker jenkins

USER jenkins