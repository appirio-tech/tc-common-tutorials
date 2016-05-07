
# Build the image

	docker build --rm=true -t appiriodevops/ldap .

# Run the comtainer

    docker run -it appiriodevops/ldap

# Verification Steps:

* Verify TLS connection requirement:

	ldapsearch -x

You should see connection error, since it does not use TLS connection.

* Use -Z to start a TLS connection:

	ldapsearch -x -Z

* Verify user data:

	ldapsearch -x -Z -b "dc=topcoder,dc=com" -D "cn=Manager,dc=topcoder,dc=com" -w secret
