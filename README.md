AFO-App – CI/CD with GitHub Actions, Docker, Kubernetes & Argo CD

This was an E-Commerce application using Node.js. I created the required Dockerfile and Kubernetes manifest files using the official documentation and implemented Continuous Integration using GitHub Actions and Continuous Deployment using GitOps with Argo CD on Azure Kubernetes Service (AKS).

Continuous Integration

For the Continuous Integration part, I used GitHub Actions to create a pipeline that checks out the Git repository, installs the required dependencies using npm install, and builds and tests the application through the pipeline steps.
<img width="1322" height="628" alt="image" src="https://github.com/user-attachments/assets/499bc260-2d65-47a7-b354-fa6891637ece" />
After building and testing the application, the pipeline builds the Docker image using docker build.

I stored my Docker Hub login credentials in GitHub Secrets and used them in the next step to login to Docker Hub securely.

The built Docker image is then pushed to Docker Hub using the latest image tag.

I also used shell commands in the pipeline to update the Kubernetes deployment file with the latest Docker image.
<img width="1325" height="516" alt="image" src="https://github.com/user-attachments/assets/6fbb8982-84c7-4bbe-a9af-90c0ae34e5ec" />
After the pipeline completes successfully, the latest image is updated in the deployment.yaml file and the Continuous Integration part is completed.
Continuous Deployment

For the Continuous Deployment part, I created a customized Azure Kubernetes Service (AKS) cluster with a node pool consisting of two standard virtual machine nodes.
<img width="1350" height="643" alt="image" src="https://github.com/user-attachments/assets/4bf6c63b-7c85-47f2-8d02-700dbddfcfd2" />
I logged into the AKS cluster using Azure CLI and installed/configured kubectl to access the Kubernetes environment.

I then created an Argo CD namespace and installed Argo CD in the Kubernetes cluster.
<img width="1126" height="551" alt="image" src="https://github.com/user-attachments/assets/f58fd2ec-cf2c-4ed9-b196-a3edf9c6c0b9" />

I patched the Argo CD service to LoadBalancer so that I could access the Argo CD UI through a browser.

To retrieve the initial Argo CD administrator password, I used:

kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d

The retrieved password can then be used to login to Argo CD.
<img width="1335" height="687" alt="image" src="https://github.com/user-attachments/assets/e8228301-5dbf-4a11-9886-ba0ac0e2fd5c" />

Connect Git Repository

In Argo CD, I went to Settings → Repositories, added my Git repository URL and connected the repository.

Since my repository is public, credentials were not required.
<img width="1135" height="643" alt="image" src="https://github.com/user-attachments/assets/0200182a-b040-4f3b-8bf8-bb35078717a5" /> 


<img width="1331" height="625" alt="image" src="https://github.com/user-attachments/assets/22984d2f-8225-4333-b2b3-43872f13bb32" /
Create Argo CD Application

In Argo CD, I created a new application and configured:

Application name
Project name
Sync policy
Git repository URL
Target namespace
Kubernetes manifest path

I configured the sync policy as Automatic so that Argo CD can detect changes in the Git repository and synchronize them with the AKS cluster.
<img width="1331" height="625" alt="image" src="https://github.com/user-attachments/assets/299ea74b-bd85-4355-8343-52a87e509f83" />
 Argo CD then deploys the application into the AKS cluster.
 <img width="1327" height="662" alt="image" src="https://github.com/user-attachments/assets/614658d5-d695-435c-bd52-2ca319a25684" />
Verify Kubernetes Deployment

After the Argo CD deployment, I checked the Kubernetes cluster to verify that the application pods and services were running.
<img width="870" height="326" alt="image" src="https://github.com/user-attachments/assets/8760a438-64fb-4103-966e-9d33d1d63956" />
I changed the application service to LoadBalancer to expose the application externally.

Using the LoadBalancer address, I was able to access the application through a browser.
<img width="1317" height="703" alt="image" src="https://github.com/user-attachments/assets/3e0acc96-d105-48fc-b459-8066d09e351e" />

Now we can access the application succesfully.

CI/CD Automation Test

I also tested the complete CI/CD process by making a small change to the application source code.

For example, I changed the name on the index page from:

Siva Kesava Oil Traders

to:

Amma Food Oils
<img width="522" height="382" alt="image" src="https://github.com/user-attachments/assets/8d9a34d1-06a0-4b19-a62a-bb9db1af81f0" />
commiting the change to main branch
<img width="477" height="502" alt="image" src="https://github.com/user-attachments/assets/83f7e43c-657f-4666-9c69-dc015f1a9691" />
The source-code change triggered the Continuous Integration pipeline.

The pipeline built the new Docker image, pushed it to Docker Hub and updated the Kubernetes deployment manifest with the latest image.

Argo CD then detected the updated Kubernetes manifest from Git and synchronized the changes to the AKS cluster.

The old pods were terminated and the new pods were deployed with the latest image
<img width="773" height="361" alt="image" src="https://github.com/user-attachments/assets/bfa80bfc-7167-4441-aea6-b4ebe88e1a95" />

After accessing the application, I could see the latest application changes.
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

   
Project Summary

This project gave me practical experience in implementing Continuous Integration using GitHub Actions and Continuous Deployment using GitOps with Argo CD on a Kubernetes cluster.

For the Continuous Integration part, I built a GitHub Actions pipeline to checkout the source code, install dependencies, build and test the application, build the Docker image, push the image to Docker Hub, and update the latest image in the Kubernetes manifest file.

For the Continuous Deployment part, I set up an Azure Kubernetes Service (AKS) cluster and installed Argo CD. I added the Git repository containing the Kubernetes manifests and configured Argo CD to watch and synchronize the repository automatically.

I also tested the complete CI/CD process by making a small change to the application and committing it to the main branch. The change triggered the CI process, updated the Docker image and Kubernetes manifest, and Argo CD synchronized the updated deployment to the AKS cluster. I verified the result by accessing the application and confirming that the latest changes were deployed.









