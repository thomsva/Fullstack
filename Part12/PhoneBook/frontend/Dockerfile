FROM node:16 as build
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN REACT_APP_API=http://localhost:3001 npm run build

FROM alpine
WORKDIR /app
COPY --from=build /usr/src/app/build/ /app/build/
RUN apk add thttpd \
  && addgroup -S appgroup \
  && adduser -S appuser -G appgroup \
  && chown -R appuser:appgroup /app/build
EXPOSE 5000
USER appuser
CMD ["thttpd", "-D", "-h", "0.0.0.0", "-p", "5000", "-d", "build", "-u", "appuser", "-l", "-", "-M", "60"]