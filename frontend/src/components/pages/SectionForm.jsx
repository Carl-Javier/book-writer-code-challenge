import React, { useState } from 'react';
import SubsectionForm from './SubsectionForm';

const SectionForm = () => {
    const [sectionTitle, setSectionTitle] = useState('');
    const [subsections, setSubsections] = useState([]);

    const handleAddSubsection = () => {
        setSubsections([...subsections, {}]); // Add a new subsection object to the subsections array
    };

    return (
        <div>
            <div>
                <label>Section Title</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                />
            </div>
            <button type="button" onClick={handleAddSubsection}>
                Add Subsection
            </button>
            <div>
                {subsections.map((subsection, index) => (
                    <SubsectionForm key={index} />
                ))}
            </div>
        </div>
    );
};

export default SectionForm;
