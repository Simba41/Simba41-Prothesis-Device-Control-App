document.getElementById('registerForm').addEventListener('submit', async (e) => 
    {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!data.fullName || !data.email || !data.password || !data.confirm) 
        {
            alert('Please fill in all fields');
            return;
        }

        if (data.password !== data.confirm) 
        {
            alert('Passwords do not match');
            return;
        }

        try 
        {
            console.log("Sending data:", data);
            const res = await fetch('/api/register', 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

            let result;
            try 
            {
                result = await res.json(); 
                console.log("Parsed result:", result);
            } catch (e) 
            {
                alert('Server returned invalid response (not JSON)');
                return;
            }

            if (!res.ok) 
            {
                alert(result.error || 'Registration failed');
                return;
            }

            alert('Registration successful!');
            form.reset();
            window.location.assign('/whoami.html');        
        } catch (err) 
        {
            console.error("Request failed:", err);
            alert('Server error: ' + err.message);
        }
});