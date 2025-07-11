// import React, { useState } from 'react';
// import { UserPlus } from 'lucide-react';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import { useAuth } from '../../context/AuthContext';

// interface RegisterFormProps {
//   onSuccess: () => void;
// }

// const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
//   const { register } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     role: 'buyer' as 'supplier' | 'buyer'
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     const { email, username, password, confirmPassword, role } = formData;
    
//     // Validation
//     if (!email || !username || !password || !confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const success = await register(
//         email, 
//         username, 
//         password,
//         role
//       );
      
//       if (success) {
//         onSuccess();
//       } else {
//         setError('Registration failed. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
//           {error}
//         </div>
//       )}
      
//       <Input
//         label="Email"
//         type="email"
//         name="email"
//         placeholder="Enter your email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
      
//       <Input
//         label="Username"
//         type="text"
//         name="username"
//         placeholder="Choose a username"
//         value={formData.username}
//         onChange={handleChange}
//         required
//       />
      
//       <Input
//         label="Password"
//         type="password"
//         name="password"
//         placeholder="Create a password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />
      
//       <Input
//         label="Confirm Password"
//         type="password"
//         name="confirmPassword"
//         placeholder="Confirm your password"
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         required
//       />
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Account Type
//         </label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="buyer">Buyer</option>
//           <option value="supplier">Supplier</option>
//         </select>
//       </div>
      
//       <div className="flex items-start">
//         <input
//           id="terms"
//           name="terms"
//           type="checkbox"
//           className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded mt-1"
//           required
//         />
//         <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//           I agree to the <a href="#" className="text-blue-800 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-800 hover:underline">Privacy Policy</a>
//         </label>
//       </div>
      
//       <Button
//         type="submit"
//         variant="primary"
//         fullWidth
//         isLoading={isLoading}
//       >
//         <UserPlus className="h-4 w-4 mr-2" />
//         Create Account
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;

// import React, { useState } from 'react';
// import { UserPlus } from 'lucide-react';
// import Button from '../ui/Button';
// import Input from '../ui/Input';

// interface RegisterFormProps {
//   onSuccess: () => void;
// }

// const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const { name, email, password, confirmPassword } = formData;

//     if (!name || !email || !password || !confirmPassword) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     if (!strongPasswordRegex.test(password)) {
//       setError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch(`http://localhost:8080/api/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password, confirmPassword }),
//       });

//       const text = await response.text();

//       try {
//         const data = JSON.parse(text);

//         if (response.ok) {
//           onSuccess(); // call success callback (redirect or success message)
//         } else {
//           setError(data.message || 'Registration failed. Please try again.');
//         }
//       } catch {
//         setError('Unexpected error occurred. Please try again.');
//       }
//     } catch (err) {
//       console.error('Error occurred:', err);
//       setError('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
//           {error}
//         </div>
//       )}

//       <Input
//         label="Name"
//         type="text"
//         name="name"
//         placeholder="Your full name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />

//       <Input
//         label="Email"
//         type="email"
//         name="email"
//         placeholder="Enter your email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />

//       <Input
//         label="Password"
//         type="password"
//         name="password"
//         placeholder="Create a password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />

//       <Input
//         label="Confirm Password"
//         type="password"
//         name="confirmPassword"
//         placeholder="Confirm your password"
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         required
//       />

//       <div className="flex items-start">
//         <input
//           id="terms"
//           name="terms"
//           type="checkbox"
//           className="h-4 w-4 text-blue-800 border-gray-300 rounded mt-1"
//           required
//         />
//         <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//           I agree to the <a href="#" className="text-blue-800 hover:underline">Terms</a> and <a href="#" className="text-blue-800 hover:underline">Privacy Policy</a>
//         </label>
//       </div>

//       <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
//         <UserPlus className="h-4 w-4 mr-2" />
//         Create Account
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error on every submit attempt

    const { name, email, password, confirmPassword } = formData;

    // Frontend validations
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!strongPasswordRegex.test(password)) {
      setError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const text = await response.text();

      // Handle error and success response
      let message = 'Unexpected error occurred. Please try again.';

      try {
        // If the backend response is JSON, use it
        const data = JSON.parse(text);
        message = data.message || message;
      } catch {
        // If it's plain text, set message to the raw text response
        message = text;
      }

      if (response.ok) {
        onSuccess(); // Call success callback (redirect or success message)
      } else {
        setError(message); // Show the error message
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <Input
        label="Name"
        type="text"
        name="name"
        placeholder="Your full name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-blue-800 border-gray-300 rounded mt-1"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the <a href="#" className="text-blue-800 hover:underline">Terms</a> and <a href="#" className="text-blue-800 hover:underline">Privacy Policy</a>
        </label>
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        <UserPlus className="h-4 w-4 mr-2" />
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;

