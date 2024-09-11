import './joinrestaurant.css';
import { globalJoinRestaurant, restaurantMobile } from '../Khoros_entrypoint/khoros_variable';

// Helper function to decode HTML entities
const decodeHtmlEntities = (str) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
};

const JoinRestaurant = () => {
    // Ensure that globalJoinRestaurant is a string and clean it up
    let cleanedData = '';

    if (typeof globalJoinRestaurant === 'string') {
        cleanedData = decodeHtmlEntities(globalJoinRestaurant);
    } else {
        console.error('globalJoinRestaurant is not a string!');
        return <p>Error: Data is not in the correct format.</p>;
    }

    // Parse the cleaned data
    let groups = [];
    try {
        groups = JSON.parse(cleanedData);
    } catch (error) {
        console.error('Error parsing globalJoinRestaurant:', error);
        return <p>Error: Data could not be parsed.</p>;
    }

    // Ensure that globalJoinRestaurant is an array and has items
    if (!Array.isArray(groups) || groups.length === 0) {
        console.error('globalJoinRestaurant is not in the expected format or is empty!');
        return <p>Error: Data is not available or not in the correct format.</p>;
    }

    // Transform the data to the desired format
    const formattedGroups = groups.map(item => {
        const titleKey = Object.keys(item).find(key => key.startsWith('title-'));
        const linkKey = `link-${titleKey.split('-')[1]}`;
        
        return {
            title: item[titleKey],
            link: item[linkKey]
        };
    });

    return (
        <div className='container'>
            <h2>Join a restaurant group</h2>
            <div className="groups">
                {formattedGroups.map((group, index) => (
                    <a key={index} href={group.link} className="group-link">
                        {group.title}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default JoinRestaurant;
