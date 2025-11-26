"use client";

const AnimatedIcons = () => {
  const icons = ["💻", "🚀", "⚡", "🎯", "💡", "🔥", "✨", "🌟", "📱", "🎨", "🔮", "⚙️", "🎓", "💼", "🌐", "🔬"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => {
        const left = 10 + (index * 7) % 80;
        const top = 10 + (index * 11) % 80;
        const delay = index * 0.3;
        const duration = 4 + (index % 3);
        
        return (
          <div
            key={index}
            className="absolute text-2xl sm:text-3xl opacity-10 hover:opacity-30 transition-opacity"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `float ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedIcons;

