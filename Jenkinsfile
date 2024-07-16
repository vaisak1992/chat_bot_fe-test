pipeline {
    agent any

    environment {
        FRONTEND_REPO = 'https://github.com/vaisak1992/chat_bot_fe-test.git'
        BACKEND_REPO = 'https://github.com/vaisak1992/chat_bot_be-test.git'
	      DEST_DIR = '/home/ubuntu/demo/frontend'
	    S SH_CREDENTIALS_ID = '8a0d5a1f-8c38-45e3-b496-cc1f456655a3'
        S3_BUCKET = 'test-fe-chat-bot-1'	
        EC2_USER = 'ubuntu'		     	
        EC2_HOST = '13.60.88.142'		
        EC2_KEY = '/home/vaisak007/demo.pem'	
    }

    stages {
        stage('Clone Frontend Repository') {
            steps {
                    git branch: 'main', url: "${env.FRONTEND_REPO}"
                }
            }

	stage('Copy Files to EC2') {
            steps {
                script {
                    sshagent(credentials: ["${SSH_CREDENTIALS_ID}"]) {
                        sh """
                        rsync -avz --no-perms --no-times -e "ssh -o StrictHostKeyChecking=no" . ${EC2_USER}@${EC2_HOST}:${DEST_DIR}
                        """
                    }
                }
            }
        }
        
        stage('Check for index.html') {
            steps {
                dir('/home/ubuntu/demo/frontend') {
                    script {
                        // Check if index.html exists
                        sh 'if [ -f index.html ]; then echo "index.html exists"; else echo "index.html not found"; exit 1; fi'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('/home/ubuntu/demo/frontend') {
                    script {
                        // Build the React app using Vite
                        sh 'npx vite build'
                    }
                }
            }
        }
        
        stage('Deploy Frontend to S3') {
            steps {
                dir('frontend/dist') {
                    script {
                        // Sync build folder with S3 bucket
                        sh 'aws s3 sync . s3://${env.S3_BUCKET} --delete'
                    }
                }
            }
        }
    }
}
