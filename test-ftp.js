import ftp from 'basic-ftp'
import dotenv from 'dotenv'

dotenv.config()

async function testFTP() {
  const client = new ftp.Client()
  client.ftp.verbose = true

  try {
    console.log('🧪 Testing FTP connection...')
    
    // Try different password formats
    const passwords = [
      'Error@404',
      'Error%40404',
      encodeURIComponent('Error@404')
    ]
    
    const usernames = [
      'u158969833.jdmarcng.com',
      'u158969833',
      'jdmarcng.com'
    ]
    
    for (const username of usernames) {
      for (const password of passwords) {
        console.log(`\n🔍 Trying: ${username} / ${password}`)
        
        try {
          const config = {
            host: '46.202.183.111',
            user: username,
            password: password,
            port: 21,
            secure: false
          }

          await client.access(config)
          console.log('✅ SUCCESS!')
          console.log('📁 Listing current directory...')
          
          const list = await client.list()
          console.log('Files in current directory:', list.map(item => item.name))
          
          client.close()
          return
          
        } catch (err) {
          console.log(`❌ Failed: ${err.message}`)
          client.close()
        }
      }
    }
    
    console.log('\n💡 All attempts failed. Please check your credentials.')
    
  } catch (err) {
    console.error('❌ Test failed:', err.message)
  }
}

testFTP()