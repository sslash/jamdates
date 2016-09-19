# dont think this works..
echo 'Deleting jamdates_dev';
echo 'DROP DATABASE jamdates_dev;' > psql
echo 'Creating jamdates_dev';
echo 'CREATE DATABASE jamdates_dev;' > psql
echo 'Running migrations';
# npm run db:migrate:up
echo 'Seeding data';
