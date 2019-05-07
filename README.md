# Device-Inventory-Management-Application

Steps to run the project:
After opening the git link shared by me, you will find a file named Device-Inventory-Management-Application, to the right of it you can find a green button "Clone or Download", click it.
If you download, you will get the folder on your system which should be opened using a editor, I have used VSC(Visual Studio Code).
If you Clone it, you will get the poject in your git repository from where you will have a link which you have to copy and paste in your editor git clone to pull into your system.
Next step is only for when you download, so if you have cloned, ignore next step.
After opening VSC, open the project folder in it by clicking File->Open Folder->*Select your project folder here*.
Once you have successfully opened the project, go to the WS folder using the command cd *foldername* then go to the src folder using cd src, then use the command "node app.js" to run the back end.
Repeat the above process to navigate to the front end folder i.e. UI folder in another terminal, once reached the src folder, use the command *ng serve --open*  to run the front end, i.e. UI part.
After compiling, a browser window will open where you can see the application.



Databases:
Connnection - This database is used for storing all the usernames, passwords, alloted system ID along with their roles for example admin or user. 
Connection2 - This database is used to store device information like name, ID, allocated to, status i.e. 1(system in use) or 0(system free for allocation).
Connection3 - This database stores the requests made for devices by users who dont have a system or want to request a new system.



Description and functionality:
Features for the user:
Inititally when we run the ng serve --open command we will have our login page. Here we login as a user with credentials - username:mercy@gmail.com and password:mercy.
After cicking the login button the user will be redirected to a page that gives him two choices i.e. request for a device or view his profile(his details along with the system id he is allocated to).
When the user clicks request a device, using local storage the username of the logged in user is sent to the path : "http://localhost:3000/send/" with lss i.e. username as a parameter.
At the back end we are storing this name into Connection3 database.

Features for the admin:
If we use the credentials - username:alex@gmail.com and password:alex, after clicking login using the path : "http://localhost:3000/login/" along with an object in a post request we are sending user details to the back end.
At the back end he user will be found from Connection database and his role will be found and returned to the front end. Finally if the role is admin it will redirect the user to admin page, else to the user page.

Now after the admin is logged in, he has two buttons, Get Details and the view requests.
If he clicks get details, all the details stored in the connection2 database are retrieved and displayed here.
Here the admin has two more features, he can deallocate or reallocated a user from a system.
If he does deallocate, the systemid is removed from connection database for that particular user and simultaneously the device allocated to is also removed from the connection2 database.
If he does reallocate, the function will check for free systems, i.e. devices with status 0. If there are any systems avaliable it will deallocate the current device, and allocate new device to the user, it also updates the device database for old device to status 0 and new device to status 1.

Another feature is view requests, all the requests sent by the user requesting a device are viewed here, the admin can either accept the request or reject it.
If he accepts, the user is allocated a system and details are updated in all databases, in connection3 database the user whose request is either accepted or rejected is removed.


Summary:
User requests device.
Admin accepts or rejects.
Admin can view details of all users, deallocate or reallocate them.
Admin can also view all requests for devices and accept or reject them.
If users request is accepted then he can view his profile where he can get his details and system details.
