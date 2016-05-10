# About Microservice Architecture
## Maven
Apache Maven will be used to the build the microservice.
## Supply Library
The supply library is a shared library used by all of our microservices, among other things the supply library provides jdbc persistence and base classes that simplify the initialization and execution of dropwizard applications. The most relevant classes to use in the supply library are:
### BaseApplication
This class is the superclass for all dropwizard application classes. It provides the entrypoint (main method) for the dropwizard application, and its subclasses are responsible for instantiating, initializing and registering all necessary resources for the microservice.
### BaseAppConfiguration
This is the superclass for all dropwizard configuration classes. The configuration class is responsible for loading configs from the configuration yaml file and exposing it to the application. The subclasses of this class should have the same properties as the yaml file.
#### xxxx-service.yaml 
Configuration file contains microservice specific configurations, such as datastore connection information, authentication domain, logging, etc. 

no private information should be stored in the configuration file, this includes database passwords, third party service keys like sumo logic and new relic, etc.

A file with environment specific private information to be used for substitution at build time can be introduced, and it will be stored in the jenkins server to be used by the build job.

Note that some environment specific and private information cam be injected to the xxxx-service.yml file using vm arguments e.g.:
```
java -Ddw.databases[0].password=123 … -jar xxxx-service.jar server xxxx-service.yml
```

The above would set 123 to the password property below in xxxx-service.yml:
```
# Database settings.
databases:
- datasourceName: oltp
# the name of your JDBC driver
driverClass: com.informix.jdbc.IfxDriver
# the username
user: coder
# the password
# NOTE: password is set as a java system property: i.e., -Ddw.database.password=<password>
validationQuery: select 1 from systables
- datasourceName: dw
# the name of your JDBC driver
driverClass: com.informix.jdbc.IfxDriver
# the username
user: coder
# the password
# NOTE: password is set as a java system property: i.e., -Ddw.database.password=<password>
validationQuery: select 1 from systables
```

## Main Classes
### com.appirio.service.xxxx.XXXXServiceConfiguration
It should inherit from `BaseAppConfiguration` (part of the supply library)

It should contain all the relevant properties from the xxxx-service.yml file to this specific microservice. 

### com.appirio.service.xxxx.XxxxxServiceApplication
It should extend `BaseApplication` parameterized with the configuration class created in the previous step: e.g. : XxxxxServiceApplication extends  BaseApplication<XxxxServiceConfiguration>

The `getName` method should return the name of the microservice;

The `logServiceSpecificConfiguration` should use the logger to output all configurations for the microservice that are NOT private information, i.e. don’t output tokens, keys, db passwords, etc.

A main method should exist that simple invokes the run method, e.g.:
```
   public static void main(String[] args) throws Exception {
       new XxxxServiceApplication().run(args);
   }
```
The `registerResources` method should register all resources found in the xxxx-service.yml resources property. We simple want the resources to be created and registered in a more traditional fashion, e.g.: 
```
   @Override
   protected void registerResources(ChallengeServiceConfiguration config, Environment env) throws Exception {
       // Register resources here
       env.jersey().register(new ChallengeFactory(config, env).getResourceInstance());
       env.jersey().register(new ChallengeResultsFactory(config, env).getResourceInstance());
…
```

The `prepare` method should configure the databases: 
```
configDatabases(config, config.getDatabases(), env);
```

Add the execution plugin to the microservice `pom.xml` like
```
<build>
           <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-shade-plugin</artifactId>
               <version>2.3</version>
               <configuration>
                   <createDependencyReducedPom>true</createDependencyReducedPom>
                   <filters>
                       <filter>
                           <artifact>*:*</artifact>
                           <excludes>
                               <exclude>META-INF/*.SF</exclude>
                               <exclude>META-INF/*.DSA</exclude>
                               <exclude>META-INF/*.RSA</exclude>
                           </excludes>
                       </filter>
                   </filters>
               </configuration>
               <executions>
                   <execution>
                       <phase>package</phase>
                       <goals>
                           <goal>shade</goal>
                       </goals>
                       <configuration>
                           <transformers>
                               <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer" />
                               <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
<mainClass>com.appirio.service.project.XxxxxServiceApplication</mainClass>
                               </transformer>
                           </transformers>
                       </configuration>
                   </execution>
               </executions>
           </plugin>
       </plugins>
```

Add dependencies to the microservice pom.xml.

## How to Build and Run the microservice
1. Use docker to start the depedent servies.
2. in ap-supply-library folder to 
```
mvn clean compile package install
```
3. in ap-xxxx-microservice folder to
```
mvn clean compile package
```
4. update the configuration in xxxx-service.yaml

5. run the microservice by
```
export xxx=...
java <jvm params> -jar target/xxxx-service.jar server src/main/resources/xxxx-service.yml
Note: <jvm params> should include any environment specific parameters that are not hardcoded in the yml: -D<property-name>=<value>
```
6. for authDomain in config, please use `topcoder-dev.com`
7. for JWT, 

please try following

if you go to https://jwt.io/ you can generate jwt tokens there
if you put the jwt we are using for the submission system in there, you'll see the structure we are following:
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJhZG1pbmlzdHJhdG9yIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJoZWZmYW4iLCJleHAiOjE3NjYyODkyNDYsInVzZXJJZCI6IjEzMjQ1NiIsImlhdCI6MTQ1MDkyOTI0NiwiZW1haWwiOm51bGwsImp0aSI6IjEzNjljNjAwLWUwYTEtNDUyNS1hN2M3LTU2YmU3ZDgxM2Y1MSJ9.hp5peSoj-fh3KFkskvBpfUFIcJNtsv4zIMFV-D8F3JA
```
and in this case I am using "secret" as the secret to generate the key

in order to use that jwt in your application, you have to have a `auth.properties` file in your resources folder containing:
```
secret=secret
```

