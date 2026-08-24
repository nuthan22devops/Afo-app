This was a E-Commere application using node js 
the application has been built through Chatgpt with dependencies and required frontend and backend 
and i have created the Dockerfile and Kubernetes manifest file using official documentation respectively
using git hub actions for Continous integration CI part
and Azure Kubernetes cluster for Continuos deployment using Argocd 
through GITHUB Actions CI we have triggred pipeline which will checkout the git repository for source code, and with installing dependencies using npm install , and building and testing the applications through pipeline steps
<img width="1322" height="628" alt="image" src="https://github.com/user-attachments/assets/499bc260-2d65-47a7-b354-fa6891637ece" />

Building the docker image with docker build commands and stored my docker login credentials in github secrets
then in next step login to docker with declared varialbles and then pushed the builded image into the docker hub with latest image tag
and written a shell script commands to update the kuberentes deployment file with latest image through git commands, which has been build through ci process
now the image has been updated successfully in deployment.yaml and the Continous integration has been succesfully done 
<img width="1325" height="516" alt="image" src="https://github.com/user-attachments/assets/6fbb8982-84c7-4bbe-a9af-90c0ae34e5ec" />

CD part
create customized Azure kubernetes cluster with nodepool constisting of only 2 nodes with standard Virtual machine.
<img width="1350" height="643" alt="image" src="https://github.com/user-attachments/assets/4bf6c63b-7c85-47f2-8d02-700dbddfcfd2" />
login to my AKS cluster cluster credentials using azure cli, and installed kubectl to access the cluster environment
created a ArgoCD namespace and installed Argocd 
<img width="1126" height="551" alt="image" src="https://github.com/user-attachments/assets/f58fd2ec-cf2c-4ed9-b196-a3edf9c6c0b9" />

patched  the argocd service port to LoadBalancer to expose the argocd through internet
and taken the argocd service loadbalancer address accessed the application through browser UI with 
we have used this command to retrive the encrypted password secret of argocd 
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
echo 
with the password we can login to argocd 
ARGOCD username admin
password: xxxxxxxxxxxxxxxxxxxxxx
<img width="1335" height="687" alt="image" src="https://github.com/user-attachments/assets/e8228301-5dbf-4a11-9886-ba0ac0e2fd5c" />

In Argocd go to settings go to the repositories added via http  and provided git repo url and click on connect
Note:my account has been public there was no need of credentials
<img width="1135" height="643" alt="image" src="https://github.com/user-attachments/assets/0200182a-b040-4f3b-8bf8-bb35078717a5" /> 


<img width="1331" height="625" alt="image" src="https://github.com/user-attachments/assets/22984d2f-8225-4333-b2b3-43872f13bb32" /
Now go to Argocd application click on new application then provide application name, projectname, sync policy i have kept as automatic then repo url will be automaticaly visible as we have added in previous step you can select that or you can add your target repo url to deploy the application through argocd.
then give the namespace where your application needed to be deployed. 
add path of the kubernertes manifest files which needs to deploy the application
<img width="1331" height="625" alt="image" src="https://github.com/user-attachments/assets/299ea74b-bd85-4355-8343-52a87e509f83" />
 Now argocd will deploy the application in your Aks cluster
 <img width="1327" height="662" alt="image" src="https://github.com/user-attachments/assets/614658d5-d695-435c-bd52-2ca319a25684" />
Now go to your kubernetes cluster and check whetehr the pods and service are running or not 
<img width="870" height="326" alt="image" src="https://github.com/user-attachments/assets/8760a438-64fb-4103-966e-9d33d1d63956" />
i have changed the application service to Loadbalancer to expose the application throughout internet
using Loadbalancer address we can access the application
<img width="1317" height="703" alt="image" src="https://github.com/user-attachments/assets/3e0acc96-d105-48fc-b459-8066d09e351e" />

Now we can access the application succesfully.

now we can deploy the changes to the application using the automation when the change in the source code will trigger the pipeline for the Continous integration then the latest version image will be updated in the k8s file 
and argocd works on the git as a single source of truth it will watch the git rep path which we have provided and sync according to the changes it  automatically rollout in the updtaed deployment in kubernetes cluster
for Example i will be changing the name of my index page from  siva kesava oil traders to Amma food oils from github then the the pipeline and deployment will be auto triggered
<img width="522" height="382" alt="image" src="https://github.com/user-attachments/assets/8d9a34d1-06a0-4b19-a62a-bb9db1af81f0" />
Update header title from 'sivakesava oil Traders' to 'Amma Food oils' and commiting the change to main branch
<img width="477" height="502" alt="image" src="https://github.com/user-attachments/assets/83f7e43c-657f-4666-9c69-dc015f1a9691" />
now the pipeline will auto triggred and argocd will deploy the changes to kubernetes cluster
the old pods are being terminated and the new pods are being deployed with latest image are running.
<img width="773" height="361" alt="image" src="https://github.com/user-attachments/assets/bfa80bfc-7167-4441-aea6-b4ebe88e1a95" />

now when we access the application we can clearly see the latest changes 
<img width="1326" height="376" alt="image" src="https://github.com/user-attachments/assets/b0890028-2a5e-45b1-b439-100d67a5d7ba" />

Developer
   │
   │ git push
   ▼
GitHub
   │
   ▼
GitHub Actions
   │
   ├── npm install
   ├── npm test
   ├── Docker build
   ├── Docker login
   ├── Docker push
   │
   ▼
Docker Hub
   │
   ▼
Update GitOps Repository
   │
   ▼
Git Repository
   │
   │ Desired State
   ▼
Argo CD
   │
   │ Automatic Sync
   ▼
AKS
   │
   ├── Pod
   └── Service
        │
        ▼
     Internet
        │
        ▼
   E-Commerce Application

This Project helps me practical experience how to perform CICD through GITHUB pipeline and GITOPS Deployment through Argocd in kubernetes cluster.
where in Continous Integration part i have been build pipeline for checkout SRC. building, testing application , and pushing the docker image to dockerhub and updating the latest image in the kubernetes manifest file

In Continous Deployment part we have set up Argocd in kubernetes cluster and added the repo of the updated kubernetes manifest to watch and sync automatically , and deployed those changes in cluster

I have also tested complete automation of the CICD by making the small change to github code and commited it triggered the entire CICD proceess and we can see the newest version of image deployed.










