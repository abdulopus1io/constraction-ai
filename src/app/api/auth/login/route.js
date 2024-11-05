import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Make sure to install jsonwebtoken package
import clientPromise from '../../../lib/mongoDB';

export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
  }

  // Generate a JWT token with an expiration time
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Return the token
  return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
}
