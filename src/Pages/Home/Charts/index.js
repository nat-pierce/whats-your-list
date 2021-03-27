import { memo, useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Charts.scss';
import { useContext } from 'react';
import AppContext from '../../../AppContext';

const Charts = memo(({ favoriteMovies }) => {
    const genreData = useMemo(() => {
        const genresDict = {};

        favoriteMovies.forEach((movie, i) => {
            const { Genres, Title } = movie;
            const scoreToAdd = 100 - i;

            Genres.forEach(genre => {
                if (!genresDict[genre]) {
                    genresDict[genre] = {
                        score: 0,
                        titles: []
                    };
                }

                const barInfo = genresDict[genre];

                barInfo.score += scoreToAdd;
                barInfo.titles.push(`#${i+1} ${Title}`);
            });
        });

        return Object.keys(genresDict).map(genre => ({
            name: genre,
            score: genresDict[genre].score,
            titles: genresDict[genre].titles
        })).sort((a, b) => b.score - a.score);
    }, [favoriteMovies]);

    const decadeData = useMemo(() => {
        const decadesDict = {};

        favoriteMovies.forEach((movie, i) => {
            const { Year, Title } = movie;
            const scoreToAdd = 100 - i;
            const decade = Math.floor(Year/10)*10

            if (!decadesDict[decade]) {
                decadesDict[decade] = {
                    score: 0,
                    titles: []
                };
            }

            const barInfo = decadesDict[decade];

            barInfo.score += scoreToAdd;
            barInfo.titles.push(`#${i+1} ${Title}`);
        });

        return Object.keys(decadesDict).map(decade => ({
            name: `${decade}s`,
            decade,
            score: decadesDict[decade].score,
            titles: decadesDict[decade].titles
        })).sort((a, b) => a.decade - b.decade);
    }, [favoriteMovies]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const displayTitles = payload[0].payload.titles.slice(0, 5);
            const numAdditionalTitles = payload[0].payload.titles.length - 5;

            return (
                <div className="custom-tooltip">
                    <div className='genre-name'>{payload[0].payload.name}</div>
                    {displayTitles.map((title, i) =>
                        <div key={`${title}_${i}`}>{title}</div>
                    )}
                    {numAdditionalTitles === 1 &&
                        <div>And {numAdditionalTitles} additional movie</div>
                    }
                    {numAdditionalTitles > 1 &&
                        <div>And {numAdditionalTitles} additional movies</div>
                    }
                </div>
            );
        }
      
        return null;
    };

    return (
        <div className='charts'>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={genreData}>
                    <XAxis dataKey="name" angle={-45} textAnchor='end' interval={0} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" fill="#9B0404" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={decadeData}>
                    <XAxis dataKey="name" angle={-45} textAnchor='end' interval={0} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" fill="#9B0404" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

export default function ConnectedCharts() {
    const { state } = useContext(AppContext);
    const { favoriteMovies } = state;

    return <Charts favoriteMovies={favoriteMovies} />;
}