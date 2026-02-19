import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

/**
 * Create Super Admin User for Testing
 * 
 * This script creates a super-admin user in the database
 * for testing the admin panel authentication and features.
 */

async function createSuperAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Super admin credentials
        const superAdminData = {
            email: 'superadmin@parashari.com',
            password: 'SuperAdmin123!',
            name: 'Super Administrator',
            role: 'super-admin',
            permissions: [
                'users.view', 'users.create', 'users.edit', 'users.delete',
                'courses.view', 'courses.create', 'courses.edit', 'courses.delete',
                'media.upload', 'media.delete',
                'settings.manage'
            ],
            isActive: true
        };

        // Check if super admin already exists
        const existingAdmin = await User.findOne({ email: superAdminData.email });

        if (existingAdmin) {
            console.log('⚠️  Super admin already exists!');
            console.log('\n📧 Email:', existingAdmin.email);
            console.log('👤 Name:', existingAdmin.name);
            console.log('🔑 Role:', existingAdmin.role);
            console.log('✅ Active:', existingAdmin.isActive);
            console.log('\n💡 Use this email to login with the password you set.');

            // Ask if user wants to reset password
            console.log('\n🔄 To reset password, delete the user and run this script again.');

            await mongoose.disconnect();
            process.exit(0);
        }

        // Create super admin
        console.log('👤 Creating super admin user...');
        const superAdmin = await User.create(superAdminData);

        console.log('\n✅ Super Admin Created Successfully!\n');
        console.log('═'.repeat(60));
        console.log('📧 Email:', superAdmin.email);
        console.log('🔐 Password:', 'SuperAdmin123!');
        console.log('👤 Name:', superAdmin.name);
        console.log('🔑 Role:', superAdmin.role);
        console.log('✅ Active:', superAdmin.isActive);
        console.log('🎫 Permissions:', superAdmin.permissions.length, 'permissions granted');
        console.log('═'.repeat(60));

        console.log('\n🚀 You can now login to the admin panel with these credentials.');
        console.log('🔗 POST http://localhost:5001/api/admin/auth/login');
        console.log('\n📝 Login Request Body:');
        console.log(JSON.stringify({
            email: superAdmin.email,
            password: 'SuperAdmin123!'
        }, null, 2));

        console.log('\n⚠️  IMPORTANT: Change this password after first login in production!');

        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error creating super admin:', error);
        process.exit(1);
    }
}

createSuperAdmin();
