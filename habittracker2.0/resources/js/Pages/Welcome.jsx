import Default from '@/Layouts/Default';
import { Head } from '@inertiajs/react';
import styles from '@/Styles/Welcome.module.css'
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    // const handleImageError = () => {
    //     document
    //         .getElementById('screenshot-container')
    //         ?.classList.add('!hidden');
    //     document.getElementById('docs-card')?.classList.add('!row-span-1');
    //     document
    //         .getElementById('docs-card-content')
    //         ?.classList.add('!flex-row');
    //     document.getElementById('background')?.classList.add('!hidden');
    // };

    return (
        <>
            <Head title="Welcome" />
            <Default>
                <div className={styles.Container}>
                    <div className='text-center'>
                        <h1 className='font-bold text-5xl'>Habits Tracker Application</h1>
                        <p>This Application is Used for Track Your Daily Habits</p>
                    </div>
                </div>
            </Default>
        </>
    );
}
