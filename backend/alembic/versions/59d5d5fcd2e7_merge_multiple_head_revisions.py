"""Merge multiple head revisions

Revision ID: 59d5d5fcd2e7
Revises: 45a54bec1cb4, 74722ade6207
Create Date: 2026-07-16 23:53:05.766654

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '59d5d5fcd2e7'
down_revision = ('45a54bec1cb4', '74722ade6207')
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
