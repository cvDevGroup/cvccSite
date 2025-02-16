ifconfig | grep 'inet ' | awk '{print $2}'
hugo serve --bind 172.20.2.32 baseURL http://172.20.2.32/ --buildDrafts
