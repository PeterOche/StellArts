"\""initial_schema_with_worker_state

Revision ID: 45a54bec1cb4
Revises: 74722ade6207
Create Date: 2026-06-19 17:03:08.815919

"\""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45a54bec1cb4'
down_revision = '74722ade6207'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('worker_state',
    sa.Column('key', sa.String(length=255), nullable=False),
    sa.Column('value', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('key')
    )
    op.add_column('bookings', sa.Column('processed_event_id', sa.String(length=255), nullable=True))


def downgrade() -> None:
    op.drop_column('bookings', 'processed_event_id')
    op.drop_table('worker_state')
