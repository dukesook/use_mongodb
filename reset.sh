ehco " "
kill -9 "$(cat /run/user/"$(id -u)"/containers/networks/aardvark-dns/aardvark.pid)"
ehco " "
rm /run/user/"$(id -u)"/containers/networks/aardvark-dns/*