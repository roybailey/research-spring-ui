import React from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { Header, Table, Rating, Menu, Icon } from 'semantic-ui-react'


const MovieList = ({movies, total, page, pageSize, pageTotal, fetchMoviePage, rateMovie, match}) => {

return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Released</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Stars</Table.HeaderCell>
          <Table.HeaderCell>Directors</Table.HeaderCell>
          <Table.HeaderCell>Actors</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {movies.map((movie, idx) =>
            <Table.Row key={'movie-'+idx}>
              <Table.Cell textAlign='center'>{movie.released}</Table.Cell>
              <Table.Cell singleLine>
                <Link to={`${match.url}/${movie.id}`}>
                  <Header as='h2'>{movie.title}</Header>
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='star' clearable defaultRating={movie.stars||0} maxRating={5} onRate={rateMovie.bind(null,movie.id)}/>
              </Table.Cell>
              <Table.Cell>
                {movie.directors.map((director, idx) =>
                    <span key={'director-'+idx}>{director.name},</span>
                )}
              </Table.Cell>
              <Table.Cell>
                {movie.actors.map((actor, idx) =>
                    <span key={'actor-'+idx}>{actor.name},</span>
                )}
              </Table.Cell>
            </Table.Row>
        )}
      </Table.Body>

       <Table.Footer>
            <Table.Row>
              {fetchMoviePage?
              <Table.HeaderCell colSpan='5'>
                <Menu floated='right' pagination>
                  {page-1 > 0?
                    <Menu.Item as='a' onClick={fetchMoviePage.bind(null,page-1)} icon>
                      <Icon name='left chevron' />
                    </Menu.Item>
                  :""}
                  {page-2 > 0?
                    <Menu.Item as='a' onClick={fetchMoviePage.bind(null,page-2)}>{page-2}</Menu.Item>
                  :""}
                  {page-1 > 0?
                    <Menu.Item as='a' onClick={fetchMoviePage.bind(null,page-1)}>{page-1}</Menu.Item>
                  :""}
                  <Menu.Item as='a'><h2>{page}</h2></Menu.Item>
                  {page+1 <= pageTotal?
                    <Menu.Item as='a' onClick={fetchMoviePage.bind(null,page+1)}>{page+1}</Menu.Item>
                  :""}
                  {page+2 <= pageTotal?
                    <Menu.Item as='a' onClick={fetchMoviePage.bind(null,page+2)}>{page+2}</Menu.Item>
                  :""}
                  {page+1 <= pageTotal?
                    <Menu.Item as='a' onClick={fetchMoviePage.bind(null,page+1)} icon>
                      <Icon name='right chevron' />
                    </Menu.Item>
                  :""}
                </Menu>
              </Table.HeaderCell>
              :""}
            </Table.Row>
        </Table.Footer>
    </Table>
)}

export default withRouter(MovieList)

