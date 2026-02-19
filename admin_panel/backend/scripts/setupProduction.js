import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

/**
 * PRODUCTION SETUP SCRIPT
 * 
 * 1. Deletes any test/demo users
 * 2. Creates real super-admin with provided credentials
 */

async function setupProduction() {
    try {
        console.log('🚀 Production Admin Setup\n');
        console.log('═'.repeat(60));

        console.log('\n🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Step 1: Clean up test users
        console.log('🧹 Cleaning up test/demo users...');
        const testEmails = [
            'superadmin@parashari.com',
            'admin@test.com',
            'test@admin.com'
        ];

        const deleteResult = await User.deleteMany({
            email: { $in: testEmails }
        });

        if (deleteResult.deletedCount > 0) {
            console.log(`   ✅ Deleted ${deleteResult.deletedCount} test user(s)`);
        } else {
            console.log('   ℹ️  No test users found');
        }

        // Step 2: Check if production admin already exists
        const existingAdmin = await User.findOne({
            email: 'musharraf.codes@gmail.com'
        });

        if (existingAdmin) {
            console.log('\n⚠️  Production admin already exists!');
            console.log('   Email:', existingAdmin.email);
            console.log('   Name:', existingAdmin.name);
            console.log('   Role:', existingAdmin.role);
            console.log('\n✅ Setup complete - using existing admin account');
            await mongoose.disconnect();
            process.exit(0);
        }

        // Step 3: Create production super-admin
        console.log('\n👤 Creating production super-admin...');

        const superAdmin = await User.create({
            email: 'musharraf.codes@gmail.com',
            password: '@ortsA2026webapp', // Will be auto-hashed by pre-save hook
            name: 'Musharraf',
            role: 'super-admin',
            permissions: [
                'users.view', 'users.create', 'users.edit', 'users.delete',
                'courses.view', 'courses.create', 'courses.edit', 'courses.delete',
                'media.upload', 'media.delete',
                'settings.manage'
            ],
            isActive: true
        });

        console.log('\n✅ PRODUCTION SUPER-ADMIN CREATED!\n');
        console.log('═'.repeat(60));
        console.log('📧 Email:', superAdmin.email);
        console.log('👤 Name:', superAdmin.name);
        console.log('🔑 Role:', superAdmin.role);
        console.log('✅ Status: Active');
        console.log('🎫 Permissions:', superAdmin.permissions.length);
        console.log('═'.repeat(60));

        console.log('\n🚀 You can now login to the admin panel');
        console.log('🔗 URL: http://localhost:5174');
        console.log('📧 Email: musharraf.codes@gmail.com');
        console.log('🔐 Password: [Your password]');

        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
        console.log('✅ Production setup complete!\n');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Setup failed:', error);
        process.exit(1);
    }
}

setupProduction();
