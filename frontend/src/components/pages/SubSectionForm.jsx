import React, { useState } from 'react';

const SubsectionForm = () => {
    const [subsectionTitle, setSubsectionTitle] = useState('');
    const [subsectionContent, setSubsectionContent] = useState('');

    return (
        <div>
            <div>
                <label>Subsection Title</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={subsectionTitle}
                    onChange={(e) => setSubsectionTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Subsection Content</label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={subsectionContent}
                    onChange={(e) => setSubsectionContent(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SubsectionForm;
