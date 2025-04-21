// import React, { useState } from 'react';
// import { LogIn } from 'lucide-react';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import { useAuth } from '../../context/AuthContext';

// interface LoginFormProps {
//   onSuccess: () => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const success = await login(email, password);
      
//       if (success) {
//         onSuccess();
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // For demo login without backend
//   const handleDemoLogin = async (role: 'supplier' | 'buyer') => {
//     setIsLoading(true);
    
//     try {
//       let demoEmail = role === 'supplier' 
//         ? 'supplier@metalscrap.com' 
//         : 'buyer@greenrecycle.com';
      
//       const success = await login(demoEmail, 'demo-password');
      
//       if (success) {
//         onSuccess();
//       } else {
//         setError('Demo login failed. Please try again.');
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
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
      
//       <Input
//         label="Password"
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
      
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <input
//             id="remember-me"
//             name="remember-me"
//             type="checkbox"
//             className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded"
//           />
//           <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//             Remember me
//           </label>
//         </div>
        
//         <a href="#" className="text-sm text-blue-800 hover:text-blue-700">
//           Forgot password?
//         </a>
//       </div>
      
//       <Button
//         type="submit"
//         variant="primary"
//         fullWidth
//         isLoading={isLoading}
//       >
//         <LogIn className="h-4 w-4 mr-2" />
//         Sign In
//       </Button>
      
//       <div className="relative py-3">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300"></div>
//         </div>
//         <div className="relative flex justify-center">
//           <span className="bg-white px-2 text-sm text-gray-500">Or try demo accounts</span>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-2 gap-3">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => handleDemoLogin('supplier')}
//           disabled={isLoading}
//         >
//           Demo Supplier
//         </Button>
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => handleDemoLogin('buyer')}
//           disabled={isLoading}
//         >
//           Demo Buyer
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;

// import React, { useState } from 'react';
// import { LogIn } from 'lucide-react';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import { useAuth } from '../../context/AuthContext';

// interface LoginFormProps {
//   onSuccess: () => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Validate fields
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Send API request to backend with email and password
//       const response = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.text();

//       // Check the response status and handle success/error accordingly
//       if (response.ok) {
//         onSuccess(); // Handle successful login (redirect or other action)
//       } else {
//         setError(data); // Display error from backend response
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Demo login functionality for suppliers and buyers
//   const handleDemoLogin = async (role: 'supplier' | 'buyer') => {
//     setIsLoading(true);

//     try {
//       const demoEmail = role === 'supplier' ? 'supplier@metalscrap.com' : 'buyer@greenrecycle.com';
//       const demoPassword = 'demo-password';

//       // Send demo login request to backend
//       const response = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: demoEmail, password: demoPassword }),
//       });

//       const data = await response.text();

//       if (response.ok) {
//         onSuccess();
//       } else {
//         setError(data); // Display error from backend response
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
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <Input
//         label="Password"
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <input
//             id="remember-me"
//             name="remember-me"
//             type="checkbox"
//             className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded"
//           />
//           <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//             Remember me
//           </label>
//         </div>

//         <a href="#" className="text-sm text-blue-800 hover:text-blue-700">
//           Forgot password?
//         </a>
//       </div>

//       <Button
//         type="submit"
//         variant="primary"
//         fullWidth
//         isLoading={isLoading}
//       >
//         <LogIn className="h-4 w-4 mr-2" />
//         Sign In
//       </Button>

//       <div className="relative py-3">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300"></div>
//         </div>
//         <div className="relative flex justify-center">
//           <span className="bg-white px-2 text-sm text-gray-500">Or try demo accounts</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-3">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => handleDemoLogin('supplier')}
//           disabled={isLoading}
//         >
//           Demo Supplier
//         </Button>
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => handleDemoLogin('buyer')}
//           disabled={isLoading}
//         >
//           Demo Buyer
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (response.ok) {
        localStorage.setItem('loggedIn', 'true'); // ✅ Store login status
        await login(email, password); // ✅ Set user in context (optional but useful)
        onSuccess();
      } else {
        setError(data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'supplier' | 'buyer') => {
    setIsLoading(true);

    try {
      const demoEmail =
        role === 'supplier' ? 'supplier@metalscrap.com' : 'buyer@greenrecycle.com';
      const demoPassword = 'demo-password';

      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: demoEmail, password: demoPassword }),
      });

      const data = await response.text();

      if (response.ok) {
        localStorage.setItem('loggedIn', 'true'); // ✅ Store login status
        await login(demoEmail, demoPassword); // ✅ Set user in context
        onSuccess();
      } else {
        setError(data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
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
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <a href="#" className="text-sm text-blue-800 hover:text-blue-700">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>

      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">Or try demo accounts</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleDemoLogin('supplier')}
          disabled={isLoading}
        >
          Demo Supplier
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleDemoLogin('buyer')}
          disabled={isLoading}
        >
          Demo Buyer
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

