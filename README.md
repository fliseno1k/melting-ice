# Connect to the primary node 

rs.initiate({
    "_id" : "replica-set",
    "members" : [
        {"_id" : 0, "host" : "mongo-primary:27017"},
        {"_id" : 1, "host" : "mongo-worker-1:27017"},
        {"_id" : 2, "host" : "mongo-worker-2:27017"},
    ]
});

# Set the priority of the master over the other nodes

conf = rs.config();
conf.members[0].priority = 2;
rs.reconfig(conf);


# Create claster admin 

use admin;
db.createUser({ user: "melting-ice_admin", pwd: "password", roles: [ { role: "userAdminAnyDatabase", db: "admin" }, { role: "clusterAdmin", db: "admin" } ] });
db.auth("melting-ice_admin", "password");

# Create a collection on a database

use melting-ice;
db.createUser({ user: "me", pwd: "password", roles: [ { role: "readWrite", db: "melting-ice" } ] });
db.createCollection("compliments");

# Verify credentials 

docker-compose exec mongo-primary mongo -u "me" -p "password" --authenticationDatabase "melting-ice"