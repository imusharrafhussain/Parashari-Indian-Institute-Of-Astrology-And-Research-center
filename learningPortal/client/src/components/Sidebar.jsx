import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Sidebar({ hierarchy, progress, currentItem, onSelect, className = '' }) {
    // hierarchy is Array of Modules
    // Each Module has .sections (Array)
    // Each Section has .contentItems (Array)

    // State to track expanded modules
    const [expandedModules, setExpandedModules] = useState({});

    // Auto-expand the module containing the current item
    useEffect(() => {
        if (currentItem && hierarchy) {
            // Find module containing current item
            // This is O(N) but N is small (hierarchy size)
            for (const module of hierarchy) {
                for (const section of module.sections || []) {
                    if (section.contentItems?.some(item => item._id === currentItem._id)) {
                        setExpandedModules(prev => ({ ...prev, [module._id]: true }));
                        return; // Found
                    }
                }
            }
        }
    }, [currentItem, hierarchy]);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const getItemStatus = (itemId) => {
        if (!progress || !progress.contentProgress) return 'LOCKED'; // Default locked if no progress? or 'OPEN'?
        // Map is serialized as object in JSON response usually, or [key, val] array. 
        // Backend V2 progress returns object map.
        const itemProg = progress.contentProgress[itemId];
        if (!itemProg) return 'LOCKED'; // Assuming default locked unless explicitly started/unlocked
        if (itemProg.status === 'COMPLETED') return 'COMPLETED';
        return 'STARTED';
    };

    // Helper to render icon based on type
    const getTypeIcon = (type) => {
        switch (type) {
            case 'VIDEO': return '🎥';
            case 'PDF': return '📄';
            case 'NOTE': return '📝';
            case 'QUIZ': return '❓';
            default: return '•';
        }
    };

    return (
        <div className={`sidebar-container ${className}`}>
            <div className="sidebar-header">
                <h3>Course Content</h3>
            </div>
            <div className="modules-list">
                {hierarchy.map(module => (
                    <div key={module._id} className="module-item">
                        <button
                            className={`module-header ${expandedModules[module._id] ? 'expanded' : ''}`}
                            onClick={() => toggleModule(module._id)}
                        >
                            <span className="module-title">{module.title}</span>
                            <span className="module-chevron">{expandedModules[module._id] ? '▼' : '▶'}</span>
                        </button>

                        {expandedModules[module._id] && (
                            <div className="module-content">
                                {(module.sections || []).map(section => (
                                    <div key={section._id} className="section-item">
                                        <div className="section-title">{section.title}</div>
                                        <div className="section-items">
                                            {(section.contentItems || []).map(item => {
                                                const isSelected = currentItem?._id === item._id;
                                                const status = getItemStatus(item._id);
                                                // Should check lock status using `item.isLocked` or derived logic
                                                // For now, assuming if it shows up in list we can try clicking it (ContentRenderer handles 403)

                                                return (
                                                    <div
                                                        key={item._id}
                                                        className={`content-item-row ${isSelected ? 'selected' : ''} ${status.toLowerCase()}`}
                                                        onClick={() => onSelect(item)}
                                                    >
                                                        <span className="item-icon">{getTypeIcon(item.type)}</span>
                                                        <span className="item-title">{item.title}</span>
                                                        <span className="item-status">
                                                            {status === 'COMPLETED' ? '✅' :
                                                                status === 'STARTED' ? '⏳' : '🔒'}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    hierarchy: PropTypes.array.isRequired,
    progress: PropTypes.object,
    currentItem: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    className: PropTypes.string
};
