# Docker descriptor for Promart
# License - http://www.eclipse.org/legal/epl-v10.html

ARG DIRIGIBLE_VERSION=latest
FROM dirigiblelabs/dirigible-base-platform-keycloak:$DIRIGIBLE_VERSION

# ProMART Application Modules
COPY modules/promart/target/promart-platform-0.0.1-SNAPSHOT.jar /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/
COPY modules/marketplace/target/promart-marketplace-0.0.1-SNAPSHOT.jar /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/
COPY modules/data/target/promart-data-0.0.1-SNAPSHOT.jar /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/

# Dirigible Runtime Configurations
COPY modules/runtime/src/main/webapp/WEB-INF/web.xml /usr/local/tomcat/webapps/ROOT/WEB-INF/

EXPOSE 8080
CMD ["catalina.sh", "run"]