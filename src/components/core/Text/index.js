import React from 'react'

const styles = {
  header: {
    marginBottom: '20px'
  }
}

export const Title = ({ label }) => (
  <h1 style={styles.header}>{label}</h1>
)
