import axios from 'axios';

async function testPut() {
    try {
        const adminApi = axios.create({
            baseURL: 'http://localhost:8000/api/admin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Pegue o token do DB local
                'Authorization': 'Bearer 1|fOqX7Fv4V8l2k6gP' // I need to get the real token from DB or create a new one properly
            }
        });
        
        const response = await adminApi.put('/pages/home', {
            title: "Home",
            hero_title: "Test",
            hero_subtitle: "Test sub",
            hero_cta_primary: "Btn 1",
            hero_cta_secondary: "Btn 2"
        });
        console.log(response.data);
    } catch (e) {
        console.error(e.response?.data || e.message);
    }
}

testPut();
