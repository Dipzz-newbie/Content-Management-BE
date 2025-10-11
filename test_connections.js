// test_connections.js
// File untuk test koneksi MySQL

import mysql from 'mysql2/promise';

async function testConnection() {
    try {
        console.log('🔄 Mencoba koneksi ke MySQL...\n');
        
        // Buat koneksi
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '100208', // kosongkan jika tidak ada password
            database: 'belajar_reactjs_content_management'
        });

        console.log('✅ Koneksi MySQL Berhasil!\n');

        // Test query
        const [rows] = await connection.execute('SELECT 1 + 1 AS result');
        console.log('✅ Test Query Berhasil:', rows[0]);

        // Cek tabel yang ada
        const [tables] = await connection.execute('SHOW TABLES');
        console.log('\n📋 Daftar Tabel:');
        tables.forEach(table => {
            console.log('  -', Object.values(table)[0]);
        });

        // Cek user yang ada
        const [users] = await connection.execute('SELECT username, name FROM users LIMIT 5');
        console.log('\n👥 Data Users:');
        if (users.length === 0) {
            console.log('  (Belum ada data)');
        } else {
            users.forEach(user => {
                console.log(`  - ${user.username} (${user.name})`);
            });
        }

        await connection.end();
        console.log('\n✅ Koneksi ditutup dengan baik');

    } catch (error) {
        console.error('\n❌ Error Koneksi MySQL:');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('\n💡 Solusi:');
        
        if (error.code === 'ECONNREFUSED') {
            console.error('   - Pastikan MySQL server sudah berjalan');
            console.error('   - Cek XAMPP/WAMP atau MySQL service');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('   - Cek username dan password MySQL');
            console.error('   - Default: user=root, password=kosong');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('   - Database belum dibuat');
            console.error('   - Buat database: CREATE DATABASE belajar_nodejs_restful_api');
        }
    }
}

// Jalankan test
testConnection();