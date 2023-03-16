docker rm -f scan
docker rmi loopick:scan
docker build -t loopick:scan .
# docker run -d --network loop_net --restart always --name scan -e TZ=Asia/Taipei loopick:scan 
