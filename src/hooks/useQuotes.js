import { useState, useEffect } from 'react';

const fallbackQuotes = [
  { quote: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { quote: "The question isn't who is going to let me; it's who is going to stop me.", author: "Ayn Rand" },
  { quote: "Every strike brings me closer to the next home run.", author: "Babe Ruth" },
  { quote: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { quote: "Don't worry about failure; you only have to be right once.", author: "Drew Houston" },
  { quote: "You carry the passport to your own happiness.", author: "Diane Von Furstenberg" },
  { quote: "Never let success get to your head, and never let failure get to your heart.", author: "Drake" },
  { quote: "Ideation without execution is delusion.", author: "Robin Sharma" },
  { quote: "The two most important days in your life are the day you’re born and the day you find out why.", author: "Mark Twain" },
  { quote: "Nothing ever goes away until it teaches us what we need to know.", author: "Pema Chödrön" },
  { quote: "We can see through others only when we can see through ourselves.", author: "Bruce Lee" },
  { quote: "First, forget inspiration. Habit is more dependable...", author: "Octavia Butler" },
  { quote: "The best way out is always through.", author: "Robert Frost" },
  { quote: "If there is no struggle, there is no progress.", author: "Frederick Douglass" },
  { quote: "Courage is like a muscle. We strengthen it by use.", author: "Ruth Gordo" },
  { quote: "Everything you want is on the other side of fear.", author: "George Addair" },
  { quote: "Success is not the absence of failure; it's the persistence through failure.", author: "Aisha Tyler" },
  { quote: "Ambition is the path to success. Persistence is the vehicle you arrive in.", author: "Bill Bradley" },
  { quote: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { quote: "The best way out is always through.", author: "Robert Frost" },
  { quote: "You keep putting one foot in front of the other...", author: "Tom Hiddleston" },
  { quote: "Keep a little fire burning, however small, however hidden.", author: "Cormac McCarthy" },
  { quote: "Character consists of what you do on the third and fourth tries.", author: "James A. Michener" },
  { quote: "Talent is nothing without persistence.", author: "Dean Crawford" },
  { quote: "Life is full of challenges, but I always have the three Ps: passion, patience and persistence...", author: "Butch Hartman" },
  { quote: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
  { quote: "We are what we repeatedly do. Excellence, then, is not an act but a habit.", author: "Aristotle" },
  { quote: "What is coming is better than what is gone.", author: "Unknown" },
  { quote: "Attitude is a choice. Happiness is a choice...", author: "Roy T. Bennett" },
  { quote: "Dwell on the beauty of life...", author: "Marcus Aurelius" },
  { quote: "Live as if you were to die tomorrow...", author: "Mahatma Gandhi" },
  { quote: "Never stop learning because life never stops teaching.", author: "Unknown" },
  { quote: "If you’re the smartest person in the room, you’re in the wrong room.", author: "Unknown" },
  { quote: "The capacity to learn is a gift...", author: "Brian Herbert" },
  { quote: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { quote: "What is the worst that can happen?", author: "Unknown" },
  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { quote: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { quote: "Well done is better than well said.", author: "Benjamin Franklin" },
  { quote: "Coming together is a beginning...", author: "Henry Ford" },
  { quote: "You will face many defeats in life...", author: "Maya Angelou" },
  { quote: "You are never too old to set another goal...", author: "C.S. Lewis" },
  { quote: "Imagination is more important than knowledge.", author: "Albert Einstein" },
  { quote: "Life is about making an impact, not making an income.", author: "Kevin Kruse" },
  { quote: "Whatever the mind of man can conceive and believe...", author: "Napoleon Hill" },
  { quote: "If you can dream it, you can do it.", author: "Walt Disney" },
  { quote: "Success is going from failure to failure without losing your enthusiasm.", author: "Winston Churchill" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { quote: "Always continue the climb...", author: "Ella Wheeler Wilcox" },
  { quote: "Talent wins games, but teamwork and intelligence win championships.", author: "Michael Jordan" },
  { quote: "A champion is afraid of losing...", author: "Billie Jean King" },
  { quote: "A winner is a dreamer who never gives up.", author: "Nelson Mandela" },
  { quote: "Winning means you’re willing to go longer...", author: "Vince Lombardi" },
  { quote: "When I win and when I lose...", author: "Nicki Minaj" },
  { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { quote: "Time management is about life management.", author: "Idowu Koyenikan" },
  { quote: "I think, therefore I am.", author: "René Descartes" },
  { quote: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
  { quote: "Everything you are will show in what you do.", author: "Thomas Edison" },
  { quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { quote: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  { quote: "A day without laughter is a day wasted.", author: "Charlie Chaplin" },
  { quote: "I have been impressed with the urgency of doing...", author: "Leonardo da Vinci" },
  { quote: "There's a way to do it better – find it.", author: "Thomas A. Edison" },
  { quote: "No person is strong enough to carry a cross and a prejudice at the same time.", author: "William Arthur Ward" },
  { quote: "If you can imagine it, you can achieve it...", author: "William Arthur Ward" },
  { quote: "Every sunrise is a message from God, and every sunset is his signature.", author: "William Arthur Ward" },
  { quote: "The mediocre teacher tells, the good teacher explains, the superior teacher demonstrates, the great teacher inspires.", author: "William Arthur Ward" },
  { quote: "Live, laugh, love.", author: "Unknown" },
  { quote: "Carpe diem. Seize the day, boys. Make your lives extraordinary.", author: "Dead Poets Society" },
  { quote: "What is done in love is done well.", author: "Vincent Van Gogh" },
  { quote: "Do not wait; the time will never be just right.", author: "George Herbert" },
  { quote: "Too many of us are not living our dreams because we are living our fears.", author: "Les Brown" },
  { quote: "Our greatest glory is not in never falling but in rising every time we fall.", author: "Confucius" },
  { quote: "A ship is always safe at the shore, but that is not what it is built for.", author: "Albert Einstein" },
  { quote: "Don't sit down and wait for the opportunities to come...", author: "Madam C.J. Walker" },
  { quote: "Opportunity is missed by most people because it is dressed in overalls...", author: "Thomas Edison" },
  { quote: "The most difficult thing is the decision to act; the rest is merely tenacity.", author: "Amelia Earhart" },
  { quote: "I can't change the direction of the wind, but I can adjust my sails...", author: "Jimmy Dean" },
  { quote: "You get what you give.", author: "Jennifer Lopez" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { quote: "Don't let the fear of striking out hold you back.", author: "Babe Ruth" },
  { quote: "A goal should scare you a little, and excite you a lot.", author: "Joe Vitale" },
  { quote: "Work hard in silence, let your success be your noise.", author: "Frank Ocean" },
  { quote: "Every morning starts a new page in your story...", author: "Doe Zantamata" },
  { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
  { quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
  { quote: "Nothing is impossible. The word itself says ‘I’m possible!’", author: "Audrey Hepburn" },
  { quote: "Be so good they can’t ignore you.", author: "Steve Martin" },
  { quote: "Go the extra mile, it’s never crowded.", author: "Unknown" },
  { quote: "What seems to us as bitter trials are often blessings in disguise.", author: "Oscar Wilde" },
  { quote: "Do not wait for leaders; do it alone, person to person.", author: "Mother Teresa" },
  { quote: "It is never too late to be what you might have been.", author: "George Eliot" },
  { quote: "Success doesn’t come to you, you go to it.", author: "Marva Collins" }
];

const useQuotes = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuoteData(fallbackQuotes);
    setLoading(false);
    setError('');
  }, []);

  const getQuoteByIndex = (index) => {
    if (quoteData.length === 0) {
      return { quote: '', author: '', error: 'No quotes available.' };
    }
    const validIndex = Math.min(Math.max(0, index), quoteData.length - 1);
    const selectedQuote = quoteData[validIndex];
    return {
      quote: selectedQuote.quote,
      author: selectedQuote.author,
      error: ''
    };
  };

  return { quoteData, loading, error, getQuoteByIndex };
};

export default useQuotes;
