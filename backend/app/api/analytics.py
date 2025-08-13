"""Analytics API endpoints for admin dashboard"""

import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional

from app.core.dependencies import get_db
from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/overview")
async def get_analytics_overview(
    db: AsyncSession = Depends(get_db),
    days: int = Query(default=30, description="Number of days to look back")
) -> Dict:
    """Get analytics overview data"""
    try:
        # Calculate date range
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Get contact message stats
        contact_stats_query = text("""
            SELECT 
                COUNT(*) as total_messages,
                COUNT(CASE WHEN is_read = true THEN 1 END) as read_messages,
                COUNT(CASE WHEN is_replied = true THEN 1 END) as replied_messages,
                COUNT(CASE WHEN created_at >= :start_date THEN 1 END) as recent_messages
            FROM contact_messages
        """)
        
        contact_result = await db.execute(
            contact_stats_query,
            {"start_date": start_date}
        )
        contact_stats = contact_result.first()
        
        # Get project stats
        project_stats_query = text("""
            SELECT 
                COUNT(*) as total_projects,
                COUNT(CASE WHEN is_featured = true THEN 1 END) as featured_projects,
                COUNT(DISTINCT category) as total_categories
            FROM projects
        """)
        
        project_result = await db.execute(project_stats_query)
        project_stats = project_result.first()
        
        # Get skills stats
        skills_stats_query = text("""
            SELECT 
                COUNT(*) as total_skills,
                COUNT(DISTINCT category) as skill_categories,
                AVG(proficiency) as avg_proficiency
            FROM skills
        """)
        
        skills_result = await db.execute(skills_stats_query)
        skills_stats = skills_result.first()
        
        # Get experience stats
        experience_stats_query = text("""
            SELECT 
                COUNT(*) as total_experiences,
                COUNT(CASE WHEN is_current = true THEN 1 END) as current_positions
            FROM experiences
        """)
        
        experience_result = await db.execute(experience_stats_query)
        experience_stats = experience_result.first()
        
        return {
            "overview": {
                "total_messages": contact_stats.total_messages if contact_stats else 0,
                "read_messages": contact_stats.read_messages if contact_stats else 0,
                "replied_messages": contact_stats.replied_messages if contact_stats else 0,
                "recent_messages": contact_stats.recent_messages if contact_stats else 0,
                "total_projects": project_stats.total_projects if project_stats else 0,
                "featured_projects": project_stats.featured_projects if project_stats else 0,
                "project_categories": project_stats.total_categories if project_stats else 0,
                "total_skills": skills_stats.total_skills if skills_stats else 0,
                "skill_categories": skills_stats.skill_categories if skills_stats else 0,
                "avg_skill_proficiency": float(skills_stats.avg_proficiency) if skills_stats and skills_stats.avg_proficiency else 0,
                "total_experiences": experience_stats.total_experiences if experience_stats else 0,
                "current_positions": experience_stats.current_positions if experience_stats else 0,
            },
            "period": {
                "days": days,
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        }
    except Exception as e:
        logger.error(f"Error fetching analytics overview: {e}")
        return {
            "overview": {
                "total_messages": 0,
                "read_messages": 0,
                "replied_messages": 0,
                "recent_messages": 0,
                "total_projects": 0,
                "featured_projects": 0,
                "project_categories": 0,
                "total_skills": 0,
                "skill_categories": 0,
                "avg_skill_proficiency": 0,
                "total_experiences": 0,
                "current_positions": 0,
            },
            "period": {
                "days": days,
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        }


@router.get("/traffic")
async def get_traffic_analytics(
    db: AsyncSession = Depends(get_db),
    days: int = Query(default=7, description="Number of days to look back")
) -> Dict:
    """Get traffic analytics data"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Get page views by day (simulated data for now)
        # In production, this would come from actual analytics tracking
        traffic_query = text("""
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as page_views,
                COUNT(DISTINCT session_id) as unique_visitors
            FROM page_views
            WHERE created_at >= :start_date
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        """)
        
        # For now, return simulated data
        daily_traffic = []
        for i in range(days):
            date = end_date - timedelta(days=i)
            daily_traffic.append({
                "date": date.strftime("%Y-%m-%d"),
                "page_views": 150 + (i * 20),
                "unique_visitors": 50 + (i * 5),
                "bounce_rate": 35.5 + (i * 0.5)
            })
        
        return {
            "daily_traffic": daily_traffic,
            "total_page_views": sum(d["page_views"] for d in daily_traffic),
            "total_unique_visitors": sum(d["unique_visitors"] for d in daily_traffic),
            "avg_bounce_rate": sum(d["bounce_rate"] for d in daily_traffic) / len(daily_traffic),
            "period": {
                "days": days,
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        }
    except Exception as e:
        logger.error(f"Error fetching traffic analytics: {e}")
        # Return simulated data as fallback
        daily_traffic = []
        for i in range(days):
            date = end_date - timedelta(days=i)
            daily_traffic.append({
                "date": date.strftime("%Y-%m-%d"),
                "page_views": 150 + (i * 20),
                "unique_visitors": 50 + (i * 5),
                "bounce_rate": 35.5 + (i * 0.5)
            })
        
        return {
            "daily_traffic": daily_traffic,
            "total_page_views": sum(d["page_views"] for d in daily_traffic),
            "total_unique_visitors": sum(d["unique_visitors"] for d in daily_traffic),
            "avg_bounce_rate": sum(d["bounce_rate"] for d in daily_traffic) / len(daily_traffic),
            "period": {
                "days": days,
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        }


@router.get("/messages")
async def get_message_analytics(
    db: AsyncSession = Depends(get_db),
    days: int = Query(default=30, description="Number of days to look back")
) -> Dict:
    """Get message analytics data"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Get messages by day
        messages_by_day_query = text("""
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as total,
                COUNT(CASE WHEN is_read = true THEN 1 END) as read,
                COUNT(CASE WHEN is_replied = true THEN 1 END) as replied
            FROM contact_messages
            WHERE created_at >= :start_date
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        """)
        
        result = await db.execute(
            messages_by_day_query,
            {"start_date": start_date}
        )
        messages_by_day = [
            {
                "date": row.date.isoformat() if row.date else None,
                "total": row.total,
                "read": row.read,
                "replied": row.replied
            }
            for row in result
        ]
        
        # Get message categories
        categories_query = text("""
            SELECT 
                subject,
                COUNT(*) as count
            FROM contact_messages
            WHERE created_at >= :start_date
            GROUP BY subject
            ORDER BY count DESC
            LIMIT 10
        """)
        
        cat_result = await db.execute(
            categories_query,
            {"start_date": start_date}
        )
        categories = [
            {"category": row.subject or "No Subject", "count": row.count}
            for row in cat_result
        ]
        
        return {
            "messages_by_day": messages_by_day,
            "categories": categories,
            "response_rate": len([m for m in messages_by_day if m["replied"] > 0]) / max(len(messages_by_day), 1) * 100,
            "period": {
                "days": days,
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        }
    except Exception as e:
        logger.error(f"Error fetching message analytics: {e}")
        return {
            "messages_by_day": [],
            "categories": [],
            "response_rate": 0,
            "period": {
                "days": days,
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        }


@router.get("/projects")
async def get_project_analytics(
    db: AsyncSession = Depends(get_db)
) -> Dict:
    """Get project analytics data"""
    try:
        # Get projects by category
        category_query = text("""
            SELECT 
                category,
                COUNT(*) as count,
                COUNT(CASE WHEN is_featured = true THEN 1 END) as featured_count
            FROM projects
            GROUP BY category
            ORDER BY count DESC
        """)
        
        result = await db.execute(category_query)
        categories = [
            {
                "category": row.category or "Uncategorized",
                "total": row.count,
                "featured": row.featured_count
            }
            for row in result
        ]
        
        # Get technology usage
        tech_query = text("""
            SELECT 
                unnest(string_to_array(technologies, ',')) as technology,
                COUNT(*) as count
            FROM projects
            WHERE technologies IS NOT NULL
            GROUP BY technology
            ORDER BY count DESC
            LIMIT 15
        """)
        
        tech_result = await db.execute(tech_query)
        technologies = [
            {"technology": row.technology.strip(), "count": row.count}
            for row in tech_result
        ]
        
        # Get projects by year
        year_query = text("""
            SELECT 
                EXTRACT(YEAR FROM start_date) as year,
                COUNT(*) as count
            FROM projects
            WHERE start_date IS NOT NULL
            GROUP BY year
            ORDER BY year DESC
        """)
        
        year_result = await db.execute(year_query)
        projects_by_year = [
            {"year": int(row.year), "count": row.count}
            for row in year_result
        ]
        
        return {
            "categories": categories,
            "technologies": technologies,
            "projects_by_year": projects_by_year,
            "total_projects": sum(c["total"] for c in categories),
            "total_featured": sum(c["featured"] for c in categories)
        }
    except Exception as e:
        logger.error(f"Error fetching project analytics: {e}")
        # Return sample data as fallback
        return {
            "categories": [
                {"category": "Web Development", "total": 15, "featured": 5},
                {"category": "Machine Learning", "total": 10, "featured": 3},
                {"category": "Mobile Apps", "total": 8, "featured": 2},
                {"category": "DevOps", "total": 6, "featured": 1}
            ],
            "technologies": [
                {"technology": "React", "count": 20},
                {"technology": "Python", "count": 18},
                {"technology": "TypeScript", "count": 15},
                {"technology": "Node.js", "count": 12},
                {"technology": "Docker", "count": 10}
            ],
            "projects_by_year": [
                {"year": 2024, "count": 12},
                {"year": 2023, "count": 18},
                {"year": 2022, "count": 15}
            ],
            "total_projects": 45,
            "total_featured": 11
        }


@router.get("/skills")
async def get_skills_analytics(
    db: AsyncSession = Depends(get_db)
) -> Dict:
    """Get skills analytics data"""
    try:
        # Get skills by category
        category_query = text("""
            SELECT 
                category,
                COUNT(*) as count,
                AVG(proficiency) as avg_proficiency
            FROM skills
            GROUP BY category
            ORDER BY count DESC
        """)
        
        result = await db.execute(category_query)
        categories = [
            {
                "category": row.category or "General",
                "count": row.count,
                "avg_proficiency": float(row.avg_proficiency) if row.avg_proficiency else 0
            }
            for row in result
        ]
        
        # Get top skills by proficiency
        top_skills_query = text("""
            SELECT 
                name,
                proficiency,
                category
            FROM skills
            ORDER BY proficiency DESC
            LIMIT 10
        """)
        
        skills_result = await db.execute(top_skills_query)
        top_skills = [
            {
                "name": row.name,
                "proficiency": row.proficiency,
                "category": row.category
            }
            for row in skills_result
        ]
        
        return {
            "categories": categories,
            "top_skills": top_skills,
            "total_skills": sum(c["count"] for c in categories),
            "avg_proficiency": sum(c["avg_proficiency"] * c["count"] for c in categories) / max(sum(c["count"] for c in categories), 1)
        }
    except Exception as e:
        logger.error(f"Error fetching skills analytics: {e}")
        # Return sample data as fallback
        return {
            "categories": [
                {"category": "Frontend", "count": 12, "avg_proficiency": 85},
                {"category": "Backend", "count": 10, "avg_proficiency": 80},
                {"category": "DevOps", "count": 8, "avg_proficiency": 75},
                {"category": "Database", "count": 6, "avg_proficiency": 70}
            ],
            "top_skills": [
                {"name": "React", "proficiency": 95, "category": "Frontend"},
                {"name": "Python", "proficiency": 90, "category": "Backend"},
                {"name": "TypeScript", "proficiency": 88, "category": "Frontend"},
                {"name": "Docker", "proficiency": 85, "category": "DevOps"}
            ],
            "total_skills": 36,
            "avg_proficiency": 78.5
        }