#!/bin/bash

# create postgresql commands to create a new database the standard routes way
# does no error checking, use at your own peril

# Kjør følgende script for å generere SQL-kommandoer som må brukes for å opprette database på de ønskede miljøene.
# Det bør helst kjøres lokalt på maskin pga. sikkerhetshensyn, eller evt. i /tmp-mappa på en server som login2.
# Scriptet tar databasenavnet som første og eneste parameter.  Det kan være lurt å ta vare på outputten i en egen fil.
# f.eks lagre scriptet og kjøre: ./my-copied-script.sh mydatabase >> db_commands.txt
# Bruk samme output fra scriptet for både CI/DEV slik at disse får felles passord, men egen output med egne passord for produksjondatabasen.


# Eksekvering:
# Logg inn på serverne for de miljøene du skal opprette basen på (står nevnt i første del av dette dokumentet.)
# På korrekt server, logg inn som basebruker med: sudo -u postgres psql
# Om du er logget inn vil promt se slik ut: postgres=# (som beskrevet i avsnitt lenger ned)
# Lim inn og kjør SQL-kommandoene fra output for basen. Det er gjerne linje 2-11 fra output som er kommandoene du ønsker.
# Med mindre det dukker opp feilmeldinger burde det ha gått bra.

# Du kan sjekke om databasen ble oppretta ved å logge på en server som skal ha tilgang til basen
# Når du er på serveren du vil sjekke på, logg inn på basen med: psql -h some-staging-routyfruity.ibmserver.com -U <databasenavn>_user <databasenavn> og bruk passordet
# for brukeren som scriptet genererte. (Eks: "psql -h some-staging-routyfruity.ibmserver.com -U company_user company" og ved promt bruke passordet som ble generet for company_user)
# Med mindre det dukker opp feilmeldinger og promt for basen ikke dukker opp, så finnes basen nå, og man er i mål for dette miljøet.
# Det kan se slik ut:

databasename=$1
admin_pw=`openssl rand -base64 8 | sed 's@=$@@'`
user_pw=`openssl rand -base64 8 | sed 's@=$@@'`
echo "database $databasename"

echo "CREATE DATABASE $databasename WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'nb_NO.UTF-8' LC_CTYPE = 'nb_NO.UTF-8';"
echo "ALTER DATABASE $databasename OWNER TO postgres;"
echo "REVOKE ALL ON DATABASE $databasename FROM public;"
echo "CREATE USER ${databasename}_admin with password '$admin_pw';"
echo "CREATE USER ${databasename}_user with password '$user_pw';"
echo "CREATE ROLE ${databasename}_read;"
echo "GRANT ALL ON DATABASE $databasename TO ${databasename}_admin;"
echo "GRANT CONNECT ON DATABASE $databasename TO ${databasename}_user;"
echo "GRANT ${databasename}_read TO global_read;"
echo "GRANT CONNECT ON DATABASE ${databasename} TO dwh;"

echo ""
echo "${databasename} dev|st|ci admin"
echo "${databasename} prod admin"
echo -e "${databasename}_admin\t$admin_pw"

echo "${databasename} dev|st|ci user"
echo "${databasename} prod user"
echo -e "${databasename}_user\t$user_pw"
